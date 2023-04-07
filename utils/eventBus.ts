// import { inject, provide, reactive } from 'vue';

interface EventBus {
  events: Record<string, Function[]>;
  $on(event: string, callback: Function): void;
  $off(event: string, callback: Function): void;
  $emit(event: string, ...args: any[]): void;
}

const eventBusSymbol = Symbol('eventBus');

export function createEventBus(): EventBus {
  const events: Record<string, any> = reactive({});

  function $on(event: string, callback: Function) {
    if (!events[event]) {
      events[event] = [];
    }
    events[event].push(callback);
  }

  function $off(event: string, callback: Function) {
    if (events[event]) {
      const index = events[event].indexOf(callback);
      if (index !== -1) {
        events[event].splice(index, 1);
      }
    }
  }

  function $emit(event: string, ...args: any[]) {
    if (events[event]) {
      events[event].forEach((callback: Function) => {
        callback(...args);
      });
    }
  }

  return {
    events,
    $on,
    $off,
    $emit
  };
}

export function provideEventBus() {
  const eventBus = createEventBus();
  provide(eventBusSymbol, eventBus);
}

export function useEventBus(): EventBus {
  const eventBus = inject<EventBus>(eventBusSymbol);
  if (!eventBus) {
    throw new Error('Event bus not provided!');
  }
  return eventBus;
}
