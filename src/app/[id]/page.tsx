import Home from '../page';

interface Props { params: Promise<{ id: string }> }

export default async function BackgroundPage({ params: _ }: Props) {
  // Die Hauptseite im Hintergrund anzeigen, während das Modal darüber liegt
  return <Home />;
} 