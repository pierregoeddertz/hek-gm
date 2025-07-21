import Modal from '../../../../components/Modal';
import { SmartflowerDetail } from '../../../smartflower/[id]/page';

interface Props { params: Promise<{ id: string }> }

export default async function ModalSmartflowerPage({ params }: Props) {
  return (
    <Modal>
      <SmartflowerDetail params={params} />
    </Modal>
  );
} 