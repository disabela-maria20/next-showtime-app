import { NewPassword } from '@/features';

interface Props {
  params: Promise<{
    token: string;
  }>;
}

export default async function RecuperarSenhaPage({ params }: Props) {
  const { token } = await params;
  return <NewPassword token={token} />;
}
