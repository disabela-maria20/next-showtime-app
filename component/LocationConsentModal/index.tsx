'use client';

import React, { useState, useEffect } from 'react';
import { Modal } from '../Modal';
import StreamButton from '../StreamButton';
import { useLocationStore } from '@/store/locationStore';

const LocationConsentModal = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isHydrated, setIsHydrated] = useState(false);

  const { consent, loading, checkConsentExpiration } = useLocationStore();
  const accept = useLocationStore((s) => s.acceptConsent);
  const deny = useLocationStore((s) => s.denyConsent);

  // Marca quando a store foi hidratada
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Controla quando o modal deve ser mostrado baseado no consentimento
  useEffect(() => {
    if (!isHydrated) return; // Aguarda hidratação

    // Verifica expiração primeiro
    checkConsentExpiration();

    // Só mostra o modal se consentimento for null E não estiver carregando
    if (consent === null && !loading) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [consent, loading, isHydrated, checkConsentExpiration]);

  const closeModal = () => setShowModal(false);

  const handleDeny = () => {
    deny();
    closeModal();
  };

  const handleAccept = () => {
    accept();
    closeModal();
  };

  // Não renderiza nada se não for necessário mostrar o modal
  if (!showModal) return null;

  return (
    <Modal.Root>
      <Modal.Body setOpen={closeModal} className="max-w-md">
        <Modal.Title>Permissão de Localização</Modal.Title>
        <Modal.Content>
          <p>
            Para oferecer uma experiência personalizada, precisamos acessar sua
            localização. Isso nos ajudará a mostrar conteúdo relevante para a
            sua região. Você pode permitir ou negar essa solicitação, e sempre
            poderá alterar essa configuração posteriormente nas preferências do
            aplicativo.
          </p>
        </Modal.Content>
        <Modal.Footer>
          <StreamButton
            variant="ghost"
            size="md"
            onClick={handleDeny}
            className="px-4 py-2 rounded-lg border"
          >
            Não permitir
          </StreamButton>

          <StreamButton
            variant="primary"
            size="md"
            onClick={handleAccept}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white"
          >
            Permitir
          </StreamButton>
        </Modal.Footer>
      </Modal.Body>
    </Modal.Root>
  );
};

export default LocationConsentModal;
