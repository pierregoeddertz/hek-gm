import Modal from '../../../components/Modal';
import HekDetailPage from '../../hek/[id]/page';

interface Props { params: Promise<{ id: string }> }

export default async function ModalHekPage({ params }: Props) {
  return (
    <Modal>
      <HekDetailPage params={params} />
    </Modal>
  );
} 