import { useNavigate} from 'react-router-dom';

const ChooseRoleComponent = () =>{

    const navigator = useNavigate();

    function toRegisterClient(e){
        e.preventDefault();
        navigator('/registration-client');
    }

    function toRegisterManager(e){
        e.preventDefault();
        navigator('/registration-owner');
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <button className='btn btn-success' onClick={toRegisterClient} style={{ marginRight: '10px' }}>Register client</button>
            <button className='btn btn-success' onClick={toRegisterManager} style={{ marginLeft: '10px' }}>Register manager</button>
        </div>
    );
    
}

export default ChooseRoleComponent;