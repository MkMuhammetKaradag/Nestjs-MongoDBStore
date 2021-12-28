import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Request, Response } from 'express';
import { PaymentsService } from '../../services/payments/payments.service';
import { resourceLimits } from 'worker_threads';
import { PaymentsController } from './payments.controller';

describe('PaymentsController', () => {
  let controller: PaymentsController;
  let paymentService: PaymentsService;
  // const requestMock = {
  //   query: {},
  // } as unknown as Request;

  // const statusResponsMock = {
  //   send: jest.fn((x) => x),
  // };
  // const responseMock = {
  //   status: jest.fn((x) => statusResponsMock),
  //   send: jest.fn((x) => x),
  // } as unknown as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [PaymentsService],
    }).compile();

    controller = module.get<PaymentsController>(PaymentsController);
    paymentService = module.get<PaymentsService>(PaymentsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('PAYMENTS_SERVİCE should be defined', () => {
    expect(paymentService).toBeDefined();
  });

  // describe('getpayments function', () => {
  //   it('shoulld retur a status  of 400', async () => {
  //     await controller.getPayments(requestMock, responseMock);
  //     expect(responseMock.status).toHaveBeenCalledWith(400);
  //     expect(statusResponsMock.send).toHaveBeenCalledWith({
  //       mesg: 'Missing count or page  parameter',
  //     });
  //   });

  //   it('Should  retur a status of  200 when query  params are present', async () => {
  //     requestMock.query = {
  //       count: '2',
  //       page: '1',
  //     };
  //     await controller.getPayments(requestMock, responseMock);
  //     expect(responseMock.send).toHaveBeenCalledWith(200);
  //   });
  // });

  describe('createPayment', () => {
    it('should throwe am error ', async () => {
      jest.spyOn(paymentService, 'createPayment').mockImplementation(() => {
        throw new BadRequestException();
      });
      try {
        const response = await controller.createPayment({
          email: 'test@testas.com',
          price: 100,
        });
      } catch (err) {
        console.log(err);
      }

      // expect(response).toStrictEqual({ status: 'success' });
    });
  });
});
