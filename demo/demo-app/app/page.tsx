import { Button, Label, Product } from "@neo/ui";
import ClientLogger from "./component";

export default async function Home() {
  const response = await fetch("https://dummyjson.com/products", {
    cache: "no-store",
  });

  const data = await response.json();
  console.log("Page rendered on SERVER");

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col gap-4 mb-8">
          <Label variant="primary">Primary Label</Label>
          <Button variant="primary">Primary Button</Button>
          <Label variant="secondary">Secondary Label</Label>
          <Button variant="secondary">Secondary Button</Button>
        </div>
        <ClientLogger/>
        <div>
          {data.products.map((product: { id: number; title: string }) => (
            <Product
              key={product.id}
              productId={product.id}
              productTitle={product.title}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
