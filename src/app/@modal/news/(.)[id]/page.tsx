import Modal from '../../../../components/Modal';
import { NewsDetail } from '../../../news/[id]/page';

interface Props { params: Promise<{ id: string }> }

export default async function ModalNewsPage({ params }: Props) {
  return (
    <Modal>
      <NewsDetail params={params} />
    </Modal>
  );
} 