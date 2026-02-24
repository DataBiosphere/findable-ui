import { FormEvent } from "react";

export interface Actions {
  onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}

export interface Status {
  loading: boolean;
}

export interface UseQuery {
  actions: Actions;
  status: Status;
}
