import './myButton.css';
import {action} from '@storybook/addon-actions'


interface MyButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const MyButton = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  ...props
}: MyButtonProps) => {
  const mode = primary ? 'storybook-mybutton--primary' : 'storybook-mybutton--secondary';
  return (
    <button
      type="button"
      className={['storybook-mybutton', `storybook-mybutton--${size}`, mode].join(' ')}
      style={{ backgroundColor }}
      onClick={action('MyButton')}
      {...props}
    >
      {label}
    </button>
  );
};