import CallsMerger from './index';
import {TimeOut} from '../../utils/TimeOut';

const APIUtils = () => {
  const tracker: number[] = [];
  const api = async (xs: number[]) => {
    xs.forEach(x => tracker.push(x));
    return xs;
  };
  return [tracker, api] as const;
};

test('should CallMerger merge all calls in the interval', async () => {
  const [tracker, api] = APIUtils();
  const callMerger = new CallsMerger(50, 500, api);
  callMerger.callApiSingly(1).then(result => expect(result).toBe(1));
  await TimeOut(10);
  callMerger.callApiSingly(2).then(result => expect(result).toBe(2));
  await TimeOut(10);
  callMerger.callApiSingly(3).then(result => expect(result).toBe(3));
  expect(tracker).toEqual([]);
  await TimeOut(100);
  expect(tracker).toEqual([1, 2, 3]);
});
