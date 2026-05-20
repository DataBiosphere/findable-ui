import { CollapseProvider } from "@databiosphere/findable-ui/lib/components/common/Collapse/provider/provider";
import { JSX, ReactNode } from "react";
import { TerraSetUpUIContext } from "./context";

/**
 * Provides transient UI state for the `TerraSetUpForm` (e.g. collapsed/expanded).
 * Mounted automatically inside `TerraProfileProvider`.
 * @param props - Provider props.
 * @param props.children - Children components.
 * @returns terra set-up UI provider.
 */
export function TerraSetUpUIProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <CollapseProvider initialState={true}>
      {({ isIn, onChange }) => {
        const value = { isOpen: isIn, onChange };
        return (
          <TerraSetUpUIContext.Provider value={value}>
            {children}
          </TerraSetUpUIContext.Provider>
        );
      }}
    </CollapseProvider>
  );
}
