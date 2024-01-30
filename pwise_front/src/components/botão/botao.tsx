// components/UpdateButton.tsx
import styles from './styles.module.scss'
interface UpdateButtonProps {
    identificador: string;
    onUpdateSuccess: (data: any) => void; // Coloque o tipo apropriado para seus dados de sucesso
    onUpdateError: (error: any) => void; // Coloque o tipo apropriado para seus dados de erro
  }
  
  const UpdateButton: React.FC<UpdateButtonProps> = ({ identificador, onUpdateSuccess, onUpdateError }) => {
    const handleUpdate = async () => {
      try {
        const response = await fetch(`/api/atualiza-mach/${identificador}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            // Seus dados de atualização aqui (nome, modelo, tipo, contrato)
          }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          onUpdateSuccess(data);
        } else {
          onUpdateError(data);
        }
      } catch (error) {
        console.error('Erro ao atualizar máquina:', error);
        onUpdateError({ mensagem: 'Erro interno ao atualizar máquina' });
      }
    };
  
    return (
      <button onClick={handleUpdate}>
        Atualizar Máquina
      </button>
    );
  };
  
  export default UpdateButton;
  