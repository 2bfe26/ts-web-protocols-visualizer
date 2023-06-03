import { Root } from "./AppHeader.styles";
import { Popover } from "./Popover";

type AppHeaderProps = {
  title: string;
  actions?: Array<{
    Icon: (...args: any[]) => JSX.Element;
    onClick: () => void;
    disabled?: boolean;
    label?: string;
  }>;
};

export function AppHeader(props: AppHeaderProps) {
  const { title, actions = [] } = props;

  return (
    <Root>
      <h1>{title}</h1>

      <div>
        {actions.map(({ Icon, onClick, disabled, label }, i) => (
          <Popover key={i} label={disabled ? null : label}>
            <button onClick={onClick} disabled={disabled}>
              <Icon size="20px" />
            </button>
          </Popover>
        ))}
      </div>
    </Root>
  );
}
