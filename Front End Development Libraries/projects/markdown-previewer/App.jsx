import './App.css';

const App = () => {

    return (
        <div className='container'>
            <div className='row text-center'>
                <div className='col-sm-12 text-center'>
                <h1>
                    Markdown Previewer
                </h1>
                </div>
                <div className='col-md-6'>
                    <textarea type='text' id='editor' value='editor box' style={{height: '500px', width: '500px'}}></textarea>
                </div>
                <div className='col-md-6'>
                    <textarea type='text' id='preview' value='preview box' style={{height: '500px', width: '500px'}} readOnly={true}></textarea>
                </div>
            </div>
        </div>
    )
}

export default App

