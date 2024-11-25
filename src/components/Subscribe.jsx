import React from 'react'
import "./subscribe.css"
import { IoMail } from 'react-icons/io5'

const Subscribe = () => {
  return (
    <section className="subscribe-section">
        <div className="page-wrapper newsletter-wrapper">
            <div className="newletter">
                <h2 className='newsletter-heading'>Subscribe to our newsletter to receive our daily news</h2>
                <p className="newsletter-para">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur omnis doloremque nam ab voluptas quo similique. Molestiae laudantium obcaecati animi?</p>
            <div className="input-box">
                <form>
                <IoMail className='newsletter-icon' />
                <input type="email" placeholder='Enter your email'/>
                <button type='submit' className='newsletter-subscribe'>Subscribe</button>
                </form>
            </div>
            </div>
            <div className="laptop-image">
                <img src="./images/laptop.png" alt="" />
            </div>
        </div>
    </section>
  )
}

export default Subscribe