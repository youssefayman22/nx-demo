import { Button, Card, Badge, Label, Product } from '@neo/ui';
import styles from './app.module.css';

const FEATURED_PRODUCTS = [
  { id: 101, title: 'Neo Smart Watch Pro' },
  { id: 102, title: 'Neo AirPods Max' },
  { id: 103, title: 'Neo VR Headset' },
  { id: 104, title: 'Neo Fitness Tracker' },
];

export function App() {
  return (
    <div className={styles.container}>
      <header className={styles.hero}>
        <h1>Welcome to Neo Store</h1>
        <p className={styles.subtitle}>
          Discover our latest products <Badge variant="success">New</Badge>
        </p>
        <Button variant="primary">Shop Now</Button>
      </header>

      <section className={styles.features}>
        <Card title="Free Shipping" variant="elevated">
          <Label variant="secondary">On orders over $50</Label>
        </Card>
        <Card title="24/7 Support" variant="elevated">
          <Label variant="secondary">We're here to help</Label>
        </Card>
        <Card title="Easy Returns" variant="elevated">
          <Label variant="secondary">30-day return policy</Label>
        </Card>
      </section>

      <section className={styles.products}>
        <h2>Featured Products <Badge variant="warning">Hot</Badge></h2>
        <div className={styles.productGrid}>
          {FEATURED_PRODUCTS.map((product) => (
            <Card key={product.id} variant="default">
              <Product productId={product.id} productTitle={product.title} />
              <Button variant="secondary">Add to Cart</Button>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
