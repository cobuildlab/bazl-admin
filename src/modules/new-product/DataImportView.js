import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdbreact';
import SidebarComponent from '../../components/SidebarComponent';
import { Link } from 'react-router-dom';
import View from 'react-flux-state';
import {
  productStore,
  PRODUCT_ERROR_EVENT,
  IMPORT_EVENT,
} from './newproduct-store';
import { Loader } from '../../components/Loader';
import { uploadData } from './newproduct-actions';
import { toast } from 'react-toastify';
import { DropZone } from './components/DropZone';
import PapaParse from 'papaparse';

class DataImportView extends View {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      file: null,
      data: [],
    };
  }
  componentDidMount() {
    this.subscribe(productStore, IMPORT_EVENT, () => {
      this.props.history.push('/inventory');
      toast.success('Product Uploaded');
    });
    this.subscribe(productStore, PRODUCT_ERROR_EVENT, (e) => {
      toast.error(e.message);
    });
  }
  onFiles = (files) => {
    this.setState({
      file: files[0],
    });
    console.log(this.state.file);
  };

  onSubmit = () => {
    let file = this.state.file;
    PapaParse.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: this.updateData,
    });
  };
  updateData = (result) => {
    let data = result.data;
    const fields = Object.keys(data[0]);
    if (
      !fields.includes(
        'name',
        'category',
        'description',
        'size',
        'quantity',
        'color',
        'price',
        'commission',
        'additionalFee',
        'shippingFee',
      )
    ) {
      toast.error('Error, File is not properly formatted');
    } else {
      uploadData(data);
    }
  };

  render() {
    const { file } = this.state;
    return (
      <SidebarComponent>
        <div className="d-flex justify-content-between nav-admin body">
          <div>
            <h2 className="m-0">Import Data</h2>
          </div>
          <div>
            <Link to="/new-product" className="btn btn-circle btn-circle-link">
              Single Product
            </Link>
          </div>
        </div>
        {this.state.loading ? (
          <Loader />
        ) : (
          <>
            <MDBContainer className="data-import" fluid>
              <MDBRow>
                <MDBCol size={10} className="data-dropzone">
                  <DropZone
                    onFiles={this.onFiles}
                    className={'m-2 d-inline-block'}
                  />
                  <br />
                  <div className="mt-4">
                    {file && (
                      <>
                        <span className="mr-3 mt-1">
                          <span className="text-muted">Filename:</span>{' '}
                          {file.name}
                        </span>
                        <button
                          style={{ position: 'relative', top: -2 }}
                          className=" btn btn-circle btn-circle-link"
                          size={'sm'}
                          onClick={this.onSubmit}>
                          <MDBIcon
                            style={{ position: 'relative' }}
                            icon="file-upload"
                          />{' '}
                          Upload File
                        </button>
                      </>
                    )}
                  </div>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </>
        )}
      </SidebarComponent>
    );
  }
}
export default DataImportView;
