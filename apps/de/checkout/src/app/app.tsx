import { useState } from 'react';
import { Button, Card, Input, Badge, Product } from '@neo/ui';
import styles from './app.module.css';

const CART_ITEMS = [
  { id: 1, title: 'Neo Wireless Headphones' },
  { id: 2, title: 'Neo Mechanical Keyboard' },
  { id: 3, title: 'Neo Ultra Monitor' },
];

export function App() {
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  return (
    <div className={styles.container}>
      <h1>Checkout <Badge variant="info">3 items</Badge></h1>

      <div className={styles.grid}>
        <section className={styles.cart}>
          <h2>Your Cart</h2>
          {CART_ITEMS.map((item) => (
            <Card key={item.id} variant="outlined">
              <Product productId={item.id} productTitle={item.title} />
            </Card>
          ))}
        </section>

        <section className={styles.form}>
          <Card title="Shipping Details" variant="elevated">
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={setEmail}
            />
            <Input
              label="Shipping Address"
              placeholder="123 Main St"
              value={address}
              onChange={setAddress}
            />
            <Button variant="primary">Place Order</Button>
          </Card>
        </section>
      </div>
    </div>
  );
}

export default App;
