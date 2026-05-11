import { useState } from 'react';
import { Button, Card, Input, Badge, Label } from '@neo/ui';
import styles from './app.module.css';

export function App() {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  const handleSubmit = () => {
    setStatus('processing');
    setTimeout(() => setStatus('success'), 1500);
  };

  return (
    <div className={styles.container}>
      <h1>Payment Gateway</h1>
      <p className={styles.subtitle}>
        <Label variant="primary">Secure Payment</Label>
        {' '}
        <Badge variant="success">SSL Encrypted</Badge>
      </p>

      <div className={styles.layout}>
        <Card title="Payment Details" variant="elevated">
          <Input
            label="Cardholder Name"
            placeholder="John Doe"
            value={name}
            onChange={setName}
          />
          <Input
            label="Card Number"
            placeholder="4242 4242 4242 4242"
            value={cardNumber}
            onChange={setCardNumber}
          />
          <div className={styles.row}>
            <Input
              label="Expiry"
              placeholder="MM/YY"
              value={expiry}
              onChange={setExpiry}
            />
            <Input
              label="CVV"
              placeholder="123"
              type="password"
              value={cvv}
              onChange={setCvv}
            />
          </div>

          {status === 'idle' && (
            <Button variant="primary" onClick={handleSubmit}>Pay $99.00</Button>
          )}
          {status === 'processing' && (
            <Badge variant="warning">Processing...</Badge>
          )}
          {status === 'success' && (
            <Badge variant="success">Payment Successful!</Badge>
          )}
        </Card>

        <Card title="Order Summary" variant="outlined">
          <div className={styles.summary}>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>$89.00</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Tax</span>
              <span>$10.00</span>
            </div>
            <div className={styles.summaryTotal}>
              <span>Total</span>
              <Label variant="primary">$99.00</Label>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default App;
