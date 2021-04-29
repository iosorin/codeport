export type Merge<A, B> = {
    [K in keyof A]: K extends keyof B ? B[K] : A[K];
} &
    B;

export type Required<T, P extends string> = Partial<T> & { [key in P]: string | number };
export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
