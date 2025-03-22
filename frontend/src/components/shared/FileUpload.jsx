import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PaperClipIcon, XMarkIcon } from '@heroicons/react/24/outline';

const FileUpload = ({ onFileSelect, maxSize = 5, acceptedTypes = [] }) => {
     const [dragActive, setDragActive] = useState(false);
     const [selectedFile, setSelectedFile] = useState(null);
     const [error, setError] = useState('');
     const inputRef = useRef(null);

     const handleDrag = (e) => {
          e.preventDefault();
          e.stopPropagation();
          if (e.type === "dragenter" || e.type === "dragover") {
               setDragActive(true);
          } else if (e.type === "dragleave") {
               setDragActive(false);
          }
     };

     const validateFile = (file) => {
          // Check file size (convert maxSize from MB to bytes)
          if (file.size > maxSize * 1024 * 1024) {
               setError(`File size must be less than ${maxSize}MB`);
               return false;
          }

          // Check file type if acceptedTypes array is not empty
          if (acceptedTypes.length > 0 && !acceptedTypes.includes(file.type)) {
               setError(`File type must be: ${acceptedTypes.join(', ')}`);
               return false;
          }

          return true;
     };

     const handleDrop = (e) => {
          e.preventDefault();
          e.stopPropagation();
          setDragActive(false);

          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
               const file = e.dataTransfer.files[0];
               if (validateFile(file)) {
                    setSelectedFile(file);
                    onFileSelect(file);
                    setError('');
               }
          }
     };

     const handleChange = (e) => {
          e.preventDefault();
          if (e.target.files && e.target.files[0]) {
               const file = e.target.files[0];
               if (validateFile(file)) {
                    setSelectedFile(file);
                    onFileSelect(file);
                    setError('');
               }
          }
     };

     const handleButtonClick = () => {
          inputRef.current.click();
     };

     const removeFile = () => {
          setSelectedFile(null);
          setError('');
          if (inputRef.current) {
               inputRef.current.value = '';
          }
     };

     return (
          <div className="w-full">
               <div
                    className={`relative border-2 border-dashed rounded-lg p-6 transition-colors
          ${dragActive
                              ? 'border-blue-500 bg-blue-50/5'
                              : 'border-gray-600 hover:border-gray-500'
                         }
        `}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
               >
                    <input
                         ref={inputRef}
                         type="file"
                         className="hidden"
                         onChange={handleChange}
                         accept={acceptedTypes.join(',')}
                    />

                    <div className="flex flex-col items-center justify-center space-y-3">
                         <PaperClipIcon className="w-8 h-8 text-gray-400" />
                         <div className="text-center">
                              <button
                                   type="button"
                                   onClick={handleButtonClick}
                                   className="text-blue-500 hover:text-blue-400 font-medium transition-colors"
                              >
                                   Click to upload
                              </button>
                              <span className="text-gray-400"> or drag and drop</span>
                         </div>
                         <p className="text-gray-400 text-sm">
                              {acceptedTypes.length > 0
                                   ? `Accepted files: ${acceptedTypes.join(', ')}`
                                   : 'All file types accepted'
                              }
                         </p>
                         <p className="text-gray-400 text-sm">
                              Max file size: {maxSize}MB
                         </p>
                    </div>

                    <AnimatePresence>
                         {selectedFile && (
                              <motion.div
                                   initial={{ opacity: 0, y: 10 }}
                                   animate={{ opacity: 1, y: 0 }}
                                   exit={{ opacity: 0, y: -10 }}
                                   className="absolute inset-0 flex items-center justify-center bg-gray-900/95 rounded-lg backdrop-blur-sm"
                              >
                                   <div className="flex items-center space-x-4">
                                        <span className="text-white">
                                             {selectedFile.name}
                                        </span>
                                        <button
                                             onClick={removeFile}
                                             className="p-1 hover:bg-white/10 rounded-full transition-colors"
                                        >
                                             <XMarkIcon className="w-5 h-5 text-gray-400 hover:text-white" />
                                        </button>
                                   </div>
                              </motion.div>
                         )}
                    </AnimatePresence>
               </div>

               {error && (
                    <motion.p
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         className="mt-2 text-red-400 text-sm"
                    >
                         {error}
                    </motion.p>
               )}
          </div>
     );
};

export default FileUpload; 