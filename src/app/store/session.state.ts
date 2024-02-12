import { createAction, createReducer, on, props } from "@ngrx/store";


export interface SessionState {
    username: string | null;
    token: string | null;
}

export const sessionStop = createAction('session/stop');
export const sessionStart = createAction('session/start',
    props<{ username: string, token: string }>()
);

export const sessionReducer = createReducer(
    { username: null, token: null } as SessionState,
    on(sessionStop, () => ({ username: null, token: null })),
    on(sessionStart, (state: SessionState, payload) => ({ ...state, ...payload }))
)
