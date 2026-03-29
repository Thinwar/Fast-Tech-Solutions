import { Welcome } from "../welcome/welcome";

export function meta() {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <main>
      <div className="p-10 bg-shop-light-pink">
        <h2 className="text-xl font-semibold">Home</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit, quam!
          Tempore exercitationem natus doloremque nulla eos, dolore vel?
          Veritatis debitis minima unde soluta adipisci excepturi rerum alias
          velit recusandae saepe.
        </p>
      </div>
    </main>
  );
}
