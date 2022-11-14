export default class RibbonError extends Error {
  constructor(msg: string) {
    super(`[node-ribbon] ${msg}`);
  }
}
