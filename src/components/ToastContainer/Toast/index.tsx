import React, {useEffect} from 'react';
import { Container } from './styles';
import { ToastMessage, useToast } from '../../../hooks/Toast';
import { FiInfo, FiCheckCircle, FiAlertCircle, FiXCircle } from 'react-icons/fi';

interface ToastProps{
  message: ToastMessage;
}

const icons = {
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
  success: <FiCheckCircle size={24} />,
}

const Toast: React.FC<ToastProps> = ({ message }) => {
  const { removeToast } = useToast();

  //*** Usando o SetTimeout para executar após a criação do Toast o removeToast()
  //** Caso o mesmo seja fechado antes é executado o clearTimeout
  useEffect(()=>{
    const  timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    return  () => {
      clearTimeout(timer);
    }
  },[message.id, removeToast])

  return (
    <Container type={message.type} hasDescription={!!message.description}>
      {icons[message.type || 'info']}
      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>

      <button onClick={() => removeToast(message.id)} type="button">
        <FiXCircle size={18} />
      </button>

    </Container>
    );
}

export default Toast;
