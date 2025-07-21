import Modal from '../../../components/Modal';
import { HekDetail } from '../../hek/[id]/page';

interface Props { params: Promise<{ id: string }> }

export default async function ModalHekInterceptedPage({ params }: Props) {
  return (
    <Modal>
      <HekDetail params={params} />
    </Modal>
  );
} 