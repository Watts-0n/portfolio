type Listener = (isLoaded: boolean) => void;

class LoadingState {
    private isLoaded = false;
    private listeners: Set<Listener> = new Set();

    setLoaded(loaded: boolean) {
        this.isLoaded = loaded;
        this.listeners.forEach((listener) => listener(loaded));
    }

    getIsLoaded() {
        return this.isLoaded;
    }

    subscribe(listener: Listener) {
        this.listeners.add(listener);
        return () => {
            this.listeners.delete(listener);
        };
    }
}

export const globalLoadingState = new LoadingState();
