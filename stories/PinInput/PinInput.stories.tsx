import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { PinInput } from './PinInput';
import { Button } from '../Button/Button';

const meta = {
  title: 'Forms/PinInput',
  component: PinInput,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0b0b0d' },
        { name: 'card', value: '#1f1d20' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    length: { control: { type: 'number', min: 2, max: 8, step: 1 } },
    type: {
      control: { type: 'select' },
      options: ['numeric', 'alphanumeric'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    masked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    success: { control: 'boolean' },
    autoFocus: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
} satisfies Meta<typeof PinInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    length: 4,
    autoFocus: true,
  },
};

export const WithHandler: Story = {
  render: () => {
    const [value, setValue] = React.useState('');
    const [status, setStatus] = React.useState('');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
        <PinInput
          length={4}
          onChange={(val) => setValue(val)}
          onComplete={(val) => setStatus(`Complete: ${val}`)}
          autoFocus
        />
        <div style={{ color: '#8a8a8a', fontSize: '14px' }}>
          Current value: {value || '(empty)'}
        </div>
        {status && <div style={{ color: '#50fa7b', fontSize: '14px' }}>{status}</div>}
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
      <div>
        <p style={{ color: '#bdbdbd', marginBottom: '12px', textAlign: 'center' }}>Small</p>
        <PinInput size="small" />
      </div>
      <div>
        <p style={{ color: '#bdbdbd', marginBottom: '12px', textAlign: 'center' }}>Medium (default)</p>
        <PinInput size="medium" />
      </div>
      <div>
        <p style={{ color: '#bdbdbd', marginBottom: '12px', textAlign: 'center' }}>Large</p>
        <PinInput size="large" />
      </div>
    </div>
  ),
};

export const DifferentLengths: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
      <div>
        <p style={{ color: '#bdbdbd', marginBottom: '12px', textAlign: 'center' }}>2 Digits</p>
        <PinInput length={2} />
      </div>
      <div>
        <p style={{ color: '#bdbdbd', marginBottom: '12px', textAlign: 'center' }}>4 Digits (default)</p>
        <PinInput length={4} />
      </div>
      <div>
        <p style={{ color: '#bdbdbd', marginBottom: '12px', textAlign: 'center' }}>6 Digits</p>
        <PinInput length={6} />
      </div>
      <div>
        <p style={{ color: '#bdbdbd', marginBottom: '12px', textAlign: 'center' }}>8 Digits</p>
        <PinInput length={8} size="small" />
      </div>
    </div>
  ),
};

export const InputTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
      <div>
        <p style={{ color: '#bdbdbd', marginBottom: '12px', textAlign: 'center' }}>Numeric Only</p>
        <PinInput type="numeric" placeholder="0" />
      </div>
      <div>
        <p style={{ color: '#bdbdbd', marginBottom: '12px', textAlign: 'center' }}>Alphanumeric</p>
        <PinInput type="alphanumeric" placeholder="A" />
      </div>
    </div>
  ),
};

export const Masked: Story = {
  render: () => {
    const [value, setValue] = React.useState('');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
        <div>
          <p style={{ color: '#bdbdbd', marginBottom: '12px', textAlign: 'center' }}>Password Input</p>
          <PinInput masked onChange={setValue} autoFocus />
        </div>
        <div style={{ color: '#8a8a8a', fontSize: '14px' }}>
          Actual value: {value || '(empty)'}
        </div>
      </div>
    );
  },
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
      <div>
        <p style={{ color: '#bdbdbd', marginBottom: '12px', textAlign: 'center' }}>Normal</p>
        <PinInput />
      </div>
      <div>
        <p style={{ color: '#ff5555', marginBottom: '12px', textAlign: 'center' }}>Error</p>
        <PinInput error value="123" />
      </div>
      <div>
        <p style={{ color: '#50fa7b', marginBottom: '12px', textAlign: 'center' }}>Success</p>
        <PinInput success value="1234" />
      </div>
      <div>
        <p style={{ color: '#5a5a5a', marginBottom: '12px', textAlign: 'center' }}>Disabled</p>
        <PinInput disabled value="12" />
      </div>
    </div>
  ),
};

export const OTPVerification: Story = {
  render: () => {
    const [otp, setOtp] = React.useState('');
    const [status, setStatus] = React.useState<'idle' | 'verifying' | 'success' | 'error'>('idle');

    const handleComplete = (value: string) => {
      setStatus('verifying');
      setOtp(value);

      // Simulate verification
      setTimeout(() => {
        if (value === '1234') {
          setStatus('success');
        } else {
          setStatus('error');
          setTimeout(() => {
            setStatus('idle');
            setOtp('');
          }, 2000);
        }
      }, 1500);
    };

    const handleResend = () => {
      setStatus('idle');
      setOtp('');
      console.log('Resending OTP...');
    };

    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '24px', 
        alignItems: 'center',
        padding: '40px',
        background: '#1f1d20',
        border: '1px solid #3a3a3a',
        minWidth: '400px'
      }}>
        <h2 style={{ color: '#bdbdbd', margin: 0 }}>Enter Verification Code</h2>
        <p style={{ color: '#8a8a8a', margin: 0, textAlign: 'center' }}>
          We sent a 4-digit code to your email
        </p>
        
        <PinInput
          length={4}
          type="numeric"
          onComplete={handleComplete}
          error={status === 'error'}
          success={status === 'success'}
          disabled={status === 'verifying' || status === 'success'}
          value={otp}
          autoFocus
        />

        {status === 'verifying' && (
          <p style={{ color: '#f1fa8c', margin: 0 }}>Verifying...</p>
        )}
        {status === 'error' && (
          <p style={{ color: '#ff5555', margin: 0 }}>Invalid code. Try 1234</p>
        )}
        {status === 'success' && (
          <p style={{ color: '#50fa7b', margin: 0 }}>✓ Verified successfully!</p>
        )}

        <Button variant="ghost" size="small" onClick={handleResend}>
          Resend Code
        </Button>
      </div>
    );
  },
};

export const ControlledInput: Story = {
  render: () => {
    const [value, setValue] = React.useState('12');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
        <PinInput
          length={6}
          value={value}
          onChange={setValue}
        />
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button size="small" onClick={() => setValue('')}>Clear</Button>
          <Button size="small" onClick={() => setValue('123456')}>Fill All</Button>
          <Button size="small" onClick={() => setValue('999')}>Set "999"</Button>
        </div>
        <div style={{ color: '#8a8a8a', fontSize: '14px' }}>
          Current value: {value || '(empty)'}
        </div>
      </div>
    );
  },
};

export const GameCode: Story = {
  render: () => {
    const [code, setCode] = React.useState('');
    const [joined, setJoined] = React.useState(false);

    const handleJoin = () => {
      if (code.length === 6) {
        setJoined(true);
      }
    };

    const handleReset = () => {
      setCode('');
      setJoined(false);
    };

    if (joined) {
      return (
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '24px', 
          alignItems: 'center',
          padding: '40px',
          background: '#1f1d20',
          border: '1px solid #3a3a3a',
        }}>
          <h2 style={{ color: '#50fa7b', margin: 0 }}>✓ Joined Game!</h2>
          <p style={{ color: '#8a8a8a', margin: 0 }}>Room Code: {code}</p>
          <Button onClick={handleReset}>Leave Game</Button>
        </div>
      );
    }

    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '24px', 
        alignItems: 'center',
        padding: '40px',
        background: '#1f1d20',
        border: '1px solid #3a3a3a',
      }}>
        <h2 style={{ color: '#bdbdbd', margin: 0 }}>Join Game</h2>
        <p style={{ color: '#8a8a8a', margin: 0 }}>Enter 6-character room code</p>
        
        <PinInput
          length={6}
          type="alphanumeric"
          onChange={setCode}
          size="large"
          autoFocus
          placeholder="•"
        />

        <Button 
          variant="primary" 
          onClick={handleJoin}
          disabled={code.length !== 6}
        >
          Join Room
        </Button>
      </div>
    );
  },
};