'use client'

import React, { useState } from 'react';
import { Modal } from '../Modal';
import { useLocationStore } from '@/services/store/locationStore';
import StreamButton from '../StreamButton';

const LocationConsentModal = () => {
  const [showModal, setShowModal] = useState<boolean>(true);
  const closeModal = () => setShowModal(false);

  const { consent } = useLocationStore();
  const accept = useLocationStore((s) => s.acceptConsent);
  const deny = useLocationStore((s) => s.denyConsent);
  const loading = useLocationStore((s) => s.loading);
  if (consent !== null) return null;
  if (loading) return null;
  return (
    <>
      {showModal && (
        <Modal.Root>
          <Modal.Body setOpen={closeModal} className="max-w-md">
            <Modal.Title>Permissão de Localização</Modal.Title>
            <Modal.Content>
              <p>
                Para oferecer uma experiência personalizada, precisamos acessar
                sua localização. Isso nos ajudará a mostrar conteúdo relevante
                para a sua região. Você pode permitir ou negar essa solicitação,
                e sempre poderá alterar essa configuração posteriormente nas
                preferências do aplicativo.
              </p>
            </Modal.Content>
            <Modal.Footer>
              <StreamButton variant='ghost' size='md'  onClick={deny} className="px-4 py-2 rounded-lg border">
                Não permitir
              </StreamButton>

              <StreamButton variant='primary' size='md' onClick={accept} className="px-4 py-2 rounded-lg bg-blue-600 text-white">
                Permitir
              </StreamButton>
            </Modal.Footer>
          </Modal.Body>
        </Modal.Root>
      )}
    </>
  );
}
           
export default LocationConsentModal
