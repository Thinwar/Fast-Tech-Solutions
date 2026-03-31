import Container from "~/components/ui/container";
import { Welcome } from "../welcome/welcome";
import { Button } from "~/components/ui/button";
import HomeBanner from "~/components/ui/HomeBanner";

export function meta() {
  return [
    { title: "Fast Tech Solutions" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <main>
      <Container className="">
        <HomeBanner />
      </Container>
    </main>
  );
}
