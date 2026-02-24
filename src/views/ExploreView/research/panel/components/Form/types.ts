import { UseQuery } from "../../../query/types";
import { ChildrenProps } from "../../../../../../components/types";

export type FormProps = ChildrenProps & Pick<UseQuery, "actions">;
