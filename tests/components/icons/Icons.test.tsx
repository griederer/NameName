import React from 'react';
import { render, screen } from '@testing-library/react';
import { BabyIcon, ChatIcon, SendIcon } from '../../../components/icons';

describe('Icon Components', () => {
  describe('BabyIcon', () => {
    it('renders without crashing', () => {
      render(<BabyIcon />);
      const icon = screen.getByRole('img', { hidden: true });
      expect(icon).toBeInTheDocument();
    });

    it('applies default size (24x24)', () => {
      render(<BabyIcon data-testid="baby-icon" />);
      const icon = screen.getByTestId('baby-icon');
      expect(icon).toHaveAttribute('width', '24');
      expect(icon).toHaveAttribute('height', '24');
    });

    it('accepts custom size prop', () => {
      render(<BabyIcon size={32} data-testid="baby-icon" />);
      const icon = screen.getByTestId('baby-icon');
      expect(icon).toHaveAttribute('width', '32');
      expect(icon).toHaveAttribute('height', '32');
    });

    it('accepts custom className', () => {
      render(<BabyIcon className="custom-baby-class" data-testid="baby-icon" />);
      const icon = screen.getByTestId('baby-icon');
      expect(icon).toHaveClass('custom-baby-class');
    });

    it('has proper SVG structure', () => {
      render(<BabyIcon data-testid="baby-icon" />);
      const icon = screen.getByTestId('baby-icon');
      expect(icon.tagName).toBe('svg');
      expect(icon).toHaveAttribute('viewBox');
      expect(icon).toHaveAttribute('fill', 'currentColor');
    });

    it('supports accessibility attributes', () => {
      render(<BabyIcon aria-label="Baby icon" data-testid="baby-icon" />);
      const icon = screen.getByTestId('baby-icon');
      expect(icon).toHaveAttribute('aria-label', 'Baby icon');
    });

    it('has proper default accessibility', () => {
      render(<BabyIcon data-testid="baby-icon" />);
      const icon = screen.getByTestId('baby-icon');
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('ChatIcon', () => {
    it('renders without crashing', () => {
      render(<ChatIcon />);
      const icon = screen.getByRole('img', { hidden: true });
      expect(icon).toBeInTheDocument();
    });

    it('applies default size (24x24)', () => {
      render(<ChatIcon data-testid="chat-icon" />);
      const icon = screen.getByTestId('chat-icon');
      expect(icon).toHaveAttribute('width', '24');
      expect(icon).toHaveAttribute('height', '24');
    });

    it('accepts custom size prop', () => {
      render(<ChatIcon size={16} data-testid="chat-icon" />);
      const icon = screen.getByTestId('chat-icon');
      expect(icon).toHaveAttribute('width', '16');
      expect(icon).toHaveAttribute('height', '16');
    });

    it('accepts custom className', () => {
      render(<ChatIcon className="custom-chat-class" data-testid="chat-icon" />);
      const icon = screen.getByTestId('chat-icon');
      expect(icon).toHaveClass('custom-chat-class');
    });

    it('has proper SVG structure', () => {
      render(<ChatIcon data-testid="chat-icon" />);
      const icon = screen.getByTestId('chat-icon');
      expect(icon.tagName).toBe('svg');
      expect(icon).toHaveAttribute('viewBox');
      expect(icon).toHaveAttribute('fill', 'currentColor');
    });

    it('supports accessibility attributes', () => {
      render(<ChatIcon aria-label="Chat icon" data-testid="chat-icon" />);
      const icon = screen.getByTestId('chat-icon');
      expect(icon).toHaveAttribute('aria-label', 'Chat icon');
    });

    it('has proper default accessibility', () => {
      render(<ChatIcon data-testid="chat-icon" />);
      const icon = screen.getByTestId('chat-icon');
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('SendIcon', () => {
    it('renders without crashing', () => {
      render(<SendIcon />);
      const icon = screen.getByRole('img', { hidden: true });
      expect(icon).toBeInTheDocument();
    });

    it('applies default size (24x24)', () => {
      render(<SendIcon data-testid="send-icon" />);
      const icon = screen.getByTestId('send-icon');
      expect(icon).toHaveAttribute('width', '24');
      expect(icon).toHaveAttribute('height', '24');
    });

    it('accepts custom size prop', () => {
      render(<SendIcon size={20} data-testid="send-icon" />);
      const icon = screen.getByTestId('send-icon');
      expect(icon).toHaveAttribute('width', '20');
      expect(icon).toHaveAttribute('height', '20');
    });

    it('accepts custom className', () => {
      render(<SendIcon className="custom-send-class" data-testid="send-icon" />);
      const icon = screen.getByTestId('send-icon');
      expect(icon).toHaveClass('custom-send-class');
    });

    it('has proper SVG structure', () => {
      render(<SendIcon data-testid="send-icon" />);
      const icon = screen.getByTestId('send-icon');
      expect(icon.tagName).toBe('svg');
      expect(icon).toHaveAttribute('viewBox');
      expect(icon).toHaveAttribute('fill', 'currentColor');
    });

    it('supports accessibility attributes', () => {
      render(<SendIcon aria-label="Send message" data-testid="send-icon" />);
      const icon = screen.getByTestId('send-icon');
      expect(icon).toHaveAttribute('aria-label', 'Send message');
    });

    it('has proper default accessibility', () => {
      render(<SendIcon data-testid="send-icon" />);
      const icon = screen.getByTestId('send-icon');
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Icon Consistency', () => {
    it('all icons have consistent default props', () => {
      render(
        <div>
          <BabyIcon data-testid="baby" />
          <ChatIcon data-testid="chat" />
          <SendIcon data-testid="send" />
        </div>
      );

      const babyIcon = screen.getByTestId('baby');
      const chatIcon = screen.getByTestId('chat');
      const sendIcon = screen.getByTestId('send');

      // All should have same default size
      [babyIcon, chatIcon, sendIcon].forEach(icon => {
        expect(icon).toHaveAttribute('width', '24');
        expect(icon).toHaveAttribute('height', '24');
        expect(icon).toHaveAttribute('fill', 'currentColor');
        expect(icon).toHaveAttribute('aria-hidden', 'true');
      });
    });

    it('all icons accept size prop consistently', () => {
      const customSize = 18;
      render(
        <div>
          <BabyIcon size={customSize} data-testid="baby" />
          <ChatIcon size={customSize} data-testid="chat" />
          <SendIcon size={customSize} data-testid="send" />
        </div>
      );

      const babyIcon = screen.getByTestId('baby');
      const chatIcon = screen.getByTestId('chat');
      const sendIcon = screen.getByTestId('send');

      [babyIcon, chatIcon, sendIcon].forEach(icon => {
        expect(icon).toHaveAttribute('width', customSize.toString());
        expect(icon).toHaveAttribute('height', customSize.toString());
      });
    });

    it('all icons accept className prop consistently', () => {
      const customClass = 'test-icon-class';
      render(
        <div>
          <BabyIcon className={customClass} data-testid="baby" />
          <ChatIcon className={customClass} data-testid="chat" />
          <SendIcon className={customClass} data-testid="send" />
        </div>
      );

      const babyIcon = screen.getByTestId('baby');
      const chatIcon = screen.getByTestId('chat');
      const sendIcon = screen.getByTestId('send');

      [babyIcon, chatIcon, sendIcon].forEach(icon => {
        expect(icon).toHaveClass(customClass);
      });
    });
  });

  describe('Props Forwarding', () => {
    it('forwards additional SVG props', () => {
      render(
        <div>
          <BabyIcon 
            data-testid="baby" 
            id="baby-icon"
            role="img"
            aria-label="Baby"
          />
          <ChatIcon 
            data-testid="chat" 
            id="chat-icon"
            role="img"
            aria-label="Chat"
          />
          <SendIcon 
            data-testid="send" 
            id="send-icon"
            role="img"
            aria-label="Send"
          />
        </div>
      );

      const babyIcon = screen.getByTestId('baby');
      const chatIcon = screen.getByTestId('chat');
      const sendIcon = screen.getByTestId('send');

      expect(babyIcon).toHaveAttribute('id', 'baby-icon');
      expect(babyIcon).toHaveAttribute('role', 'img');
      expect(babyIcon).toHaveAttribute('aria-label', 'Baby');

      expect(chatIcon).toHaveAttribute('id', 'chat-icon');
      expect(chatIcon).toHaveAttribute('role', 'img');
      expect(chatIcon).toHaveAttribute('aria-label', 'Chat');

      expect(sendIcon).toHaveAttribute('id', 'send-icon');
      expect(sendIcon).toHaveAttribute('role', 'img');
      expect(sendIcon).toHaveAttribute('aria-label', 'Send');
    });
  });

  describe('Edge Cases', () => {
    it('handles size prop of 0', () => {
      render(<BabyIcon size={0} data-testid="baby-icon" />);
      const icon = screen.getByTestId('baby-icon');
      expect(icon).toHaveAttribute('width', '0');
      expect(icon).toHaveAttribute('height', '0');
    });

    it('handles very large size prop', () => {
      render(<ChatIcon size={1000} data-testid="chat-icon" />);
      const icon = screen.getByTestId('chat-icon');
      expect(icon).toHaveAttribute('width', '1000');
      expect(icon).toHaveAttribute('height', '1000');
    });

    it('renders with empty className', () => {
      render(<SendIcon className="" data-testid="send-icon" />);
      const icon = screen.getByTestId('send-icon');
      expect(icon).toBeInTheDocument();
    });

    it('renders with undefined props gracefully', () => {
      render(<BabyIcon size={undefined} className={undefined} data-testid="baby-icon" />);
      const icon = screen.getByTestId('baby-icon');
      expect(icon).toBeInTheDocument();
      // Should fall back to default size
      expect(icon).toHaveAttribute('width', '24');
      expect(icon).toHaveAttribute('height', '24');
    });
  });
});