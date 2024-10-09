export interface ProfileHandler<R, E> {
  onError: (error: E) => void;
  onSuccess: (response: R) => void;
}
