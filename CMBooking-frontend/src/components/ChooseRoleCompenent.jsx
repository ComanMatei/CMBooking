import { useNavigate } from 'react-router-dom';
import './BackGround.css';

const ChooseRoleComponent = () => {

    const navigator = useNavigate();

    function toRegisterClient(e) {
        e.preventDefault();
        navigator('/registration-client');
    }

    function toRegisterManager(e) {
        e.preventDefault();
        navigator('/registration-owner');
    }

    return (
        <div className='background-image'>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <h2 className="text-heading">Choose the type of your account!</h2>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <button className='btn-success btn-register' onClick={toRegisterClient} style={{ marginRight: '50px', marginTop: '-100px' }}>Register as client</button>
                    <button className='btn-success btn-register' onClick={toRegisterManager} style={{ marginLeft: '150px', marginTop: '50px' }}>Register as owner</button>
                </div>
            </div>
        </div>
    );
    
    
    
    

}

export default ChooseRoleComponent;