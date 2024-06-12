FROM quay.io/sampandey001/secktor
RUN git clone https://github.com/GiftedTerry/Vibez-MD  /root/GiftedTerry/Vibez-MD 
WORKDIR /root/Vibez-MD
RUN npm install
EXPOSE 3000
CMD ["npm","start" ]
