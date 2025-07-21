import Home from '../page';

interface Props { params: { id: string } }

export default async function BackgroundPage({ params: _params }: Props) {
  // Die Hauptseite im Hintergrund anzeigen, während das Modal darüber liegt
  return <Home />;
} 