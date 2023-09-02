import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

function Details({ data }) {
  const { itemId } = useParams();
  const selectedItem = data.find((item) => item.id === parseInt(itemId, 10));

  if (!selectedItem) {
    return <div>Item not found.</div>;
  }

  const shareUrl = window.location.href;
  const title = selectedItem.title;

  // Define custom margin and padding styles for icons
  const iconStyle = {
    margin: '10px', // Apply margin to the icons
    padding: '5px', // Apply padding to the icons
  };

  return (
    <div>
      <h1 className='text-center py-4'>Item Details</h1>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6 offset-md-3'>
            <div className='card'>
              <img
                src={selectedItem.thumbnailUrl}
                className='card-img-top'
                alt={selectedItem.title}
              />
              <div className='card-body'>
                <h5 className='card-title'>{selectedItem.title}</h5>
                <p className='card-text'>Album ID: {selectedItem.albumId}</p>
                <p className='card-text'>ID: {selectedItem.id}</p>

                {/* Social Share Buttons with Font Awesome Icons */}
                <div className='mb-3'>
                  <FacebookShareButton url={shareUrl} quote={title}>
                    <FontAwesomeIcon icon={faFacebook} style={iconStyle} />
                  </FacebookShareButton>
                  <TwitterShareButton url={shareUrl} title={title}>
                    <FontAwesomeIcon icon={faTwitter} style={iconStyle} />
                  </TwitterShareButton>
                  <WhatsappShareButton url={shareUrl} title={title}>
                    <FontAwesomeIcon icon={faWhatsapp} style={iconStyle} />
                  </WhatsappShareButton>
                </div>

                <Link to='/' className='btn btn-primary'>
                  Back to List
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
