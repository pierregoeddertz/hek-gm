import Modal from '../../../../components/Modal';
import NewsDetailPage from '../../../news/[id]/page';

interface Props { params: Promise<{ id: string }> }

export default async function ModalNewsInterceptedPage({ params }: Props) {
  return (
    <Modal>
      <NewsDetailPage params={params} />
    </Modal>
  );
} 