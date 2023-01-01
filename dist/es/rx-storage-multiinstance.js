import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";
/**
 * When a persistend RxStorage is used in more the one JavaScript process,
 * the even stream of the changestream() function must be broadcasted to the other
 * RxStorageInstances of the same databaseName+collectionName.
 *
 * In the past this was done by RxDB but it makes more sense to do this
 * at the RxStorage level so that the broadcasting etc can all happen inside of a WebWorker
 * and not on the main thread.
 * Also it makes it less complex to stack up different RxStorages onto each other
 * like what we do with the in-memory plugin.
 *
 * This is intened to be used inside of createStorageInstance() of a storage.
 * Do not use this if the storage anyway broadcasts the events like when using MongoDB
 * or in the future W3C might introduce a way to listen to IndexedDB changes.
 */

import { Subject } from 'rxjs';
import { mergeWith } from 'rxjs/operators';
import { BroadcastChannel } from 'broadcast-channel';

/**
 * The broadcast-channel is reused by the databaseInstanceToken.
 * This is required so that it is easy to simulate multi-tab usage
 * in the test where different instances of the same RxDatabase must
 * have different broadcast channels.
 * But also it ensures that for each RxDatabase we only create a single
 * broadcast channel that can even be reused in the leader election plugin.
 *
 * TODO at the end of the unit tests,
 * we should ensure that all channels are closed and cleaned up.
 * Otherwise we have forgot something.
 */
export var BROADCAST_CHANNEL_BY_TOKEN = new Map();
export function getBroadcastChannelReference(databaseInstanceToken, databaseName, refObject) {
  var state = BROADCAST_CHANNEL_BY_TOKEN.get(databaseInstanceToken);
  if (!state) {
    state = {
      /**
       * We have to use the databaseName instead of the databaseInstanceToken
       * in the BroadcastChannel name because different instances must end with the same
       * channel name to be able to broadcast messages between each other.
       */
      bc: new BroadcastChannel('RxDB:' + databaseName),
      refs: new Set()
    };
    BROADCAST_CHANNEL_BY_TOKEN.set(databaseInstanceToken, state);
  }
  state.refs.add(refObject);
  return state.bc;
}
export function removeBroadcastChannelReference(databaseInstanceToken, refObject) {
  var state = BROADCAST_CHANNEL_BY_TOKEN.get(databaseInstanceToken);
  if (!state) {
    return;
  }
  state.refs["delete"](refObject);
  if (state.refs.size === 0) {
    BROADCAST_CHANNEL_BY_TOKEN["delete"](databaseInstanceToken);
    return state.bc.close();
  }
}
export function addRxStorageMultiInstanceSupport(storageName, instanceCreationParams, instance,
/**
 * If provided, that channel will be used
 * instead of an own one.
 */
providedBroadcastChannel) {
  if (!instanceCreationParams.multiInstance) {
    return;
  }
  var broadcastChannel = providedBroadcastChannel ? providedBroadcastChannel : getBroadcastChannelReference(instanceCreationParams.databaseInstanceToken, instance.databaseName, instance);
  var changesFromOtherInstances$ = new Subject();
  var eventListener = function eventListener(msg) {
    if (msg.storageName === storageName && msg.databaseName === instanceCreationParams.databaseName && msg.collectionName === instanceCreationParams.collectionName && msg.version === instanceCreationParams.schema.version) {
      changesFromOtherInstances$.next(msg.eventBulk);
    }
  };
  broadcastChannel.addEventListener('message', eventListener);
  var oldChangestream$ = instance.changeStream();
  var closed = false;
  var sub = oldChangestream$.subscribe(function (eventBulk) {
    if (closed) {
      return;
    }
    broadcastChannel.postMessage({
      storageName: storageName,
      databaseName: instanceCreationParams.databaseName,
      collectionName: instanceCreationParams.collectionName,
      version: instanceCreationParams.schema.version,
      eventBulk: eventBulk
    });
  });
  instance.changeStream = function () {
    return changesFromOtherInstances$.asObservable().pipe(mergeWith(oldChangestream$));
  };
  var oldClose = instance.close.bind(instance);
  instance.close = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          closed = true;
          sub.unsubscribe();
          broadcastChannel.removeEventListener('message', eventListener);
          if (providedBroadcastChannel) {
            _context.next = 6;
            break;
          }
          _context.next = 6;
          return removeBroadcastChannelReference(instanceCreationParams.databaseInstanceToken, instance);
        case 6:
          return _context.abrupt("return", oldClose());
        case 7:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  var oldRemove = instance.remove.bind(instance);
  instance.remove = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          closed = true;
          sub.unsubscribe();
          broadcastChannel.removeEventListener('message', eventListener);
          if (providedBroadcastChannel) {
            _context2.next = 6;
            break;
          }
          _context2.next = 6;
          return removeBroadcastChannelReference(instanceCreationParams.databaseInstanceToken, instance);
        case 6:
          return _context2.abrupt("return", oldRemove());
        case 7:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
}
//# sourceMappingURL=rx-storage-multiinstance.js.map