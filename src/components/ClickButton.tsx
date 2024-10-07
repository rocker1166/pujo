import React from 'react'
import { ParallaxScroll } from './ui/parallax-scroll'
import { Modal, ModalBody, ModalContent, ModalTrigger } from './ui/animated-modal'

function Clickbutton() {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 h-screen">


      <Modal>
        <ModalTrigger className="bg-black dark:bg-white dark:text-black text-white rounded px-4 py-2">
          Open Form
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <form className="space-y-4">
              <div>
                <label htmlFor="title" className="block">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="location" className="block">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="visit" className="block">
                  Visit
                </label>
                <input
                  type="text"
                  id="visit"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </form>
          </ModalContent>
        </ModalBody>
      </Modal>

    </div>
  )
}
export default Clickbutton