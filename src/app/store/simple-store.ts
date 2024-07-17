// src/app/store/simple-store.ts
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

export class SimpleStore<StateType = any> {
  private stateSubject: BehaviorSubject<StateType>;

  // 初始化 SimpleStore 類別，並設定初始狀態
  constructor(initialState: StateType) {
    this.stateSubject = new BehaviorSubject(initialState);
  }

  // 返回當前狀態作為 Observable 流
  public getState(): Observable<StateType> {
    return this.stateSubject.pipe(distinctUntilChanged());
  }

  // 獲取當前狀態的快照（即當前值）
  public getStateSnapshot(): StateType {
    return this.stateSubject.getValue();
  }

  // 根據給定的鍵選擇並返回狀態的一部分作為 Observable 流
  public select<K extends keyof StateType>(key: K): Observable<StateType[K]> {
    return this.stateSubject.pipe(
      map((state) => state[key]),
      distinctUntilChanged()
    );
  }

  // 更新狀態，並將新狀態通知所有訂閱者
  public setState(partialState: Partial<StateType>): void {
    const currentState = this.getStateSnapshot();
    const nextState = Object.assign({}, currentState, partialState);
    this.stateSubject.next(nextState);
  }
}
