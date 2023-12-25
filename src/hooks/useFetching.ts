import { useAppDispatch } from "./reduxHooks";
import { actions } from "../redux/features/loaderErrorSlice";

type CallbackType = () => Promise<void>;

export const useFetching = (callback: CallbackType): CallbackType => {
    const dispatch = useAppDispatch();
    const putError = (error: string) => dispatch(actions.makeIsError(error));
    const makeIsLoading = () => dispatch(actions.makeIsLoading());
    const makeIsUnloading = () => dispatch(actions.makeIsUnloading());

    const fetching = async () => {
        try {
            makeIsLoading();
            await callback();
        } catch (error) {
            if (error instanceof Error) {
                putError(`${error.name} ${error.message}`)
              } else {
                putError('An unknown error occurred.');
              }
        } finally {
            makeIsUnloading();
        }
    }

    return fetching;
}