import { FirescriptRuntime } from 'firescript-runtime';
function getBananas (amount) {
  FirescriptRuntime.typing(FirescriptRuntime.TYPE_NUM, amount);
  return 3;
}
