import win32serviceutil
import win32service
import win32event
import servicemanager
import socket
import subprocess
import sys
import os
import logging


class NpmService(win32serviceutil.ServiceFramework):
    _svc_name_ = 'JuanMontero'
    _svc_display_name_ = 'JuanMontero'

    def __init__(self, args):
        win32serviceutil.ServiceFramework.__init__(self, args)
        self.hWaitStop = win32event.CreateEvent(None, 0, 0, None)
        socket.setdefaulttimeout(60)
        self.is_running = True
        self.logger = self._setup_logging()

    def _setup_logging(self):
        logger = logging.getLogger('NpmService')
        logger.setLevel(logging.INFO)
        log_file_path = os.path.join(r'C:\Users\DESA03\Desktop\API-node-JM-master', 'npm_service.log')
        handler = logging.FileHandler(log_file_path)
        formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
        handler.setFormatter(formatter)
        logger.addHandler(handler)
        return logger


    def SvcStop(self):
        self.ReportServiceStatus(win32service.SERVICE_STOP_PENDING)
        self.is_running = False
        win32event.SetEvent(self.hWaitStop)

    def SvcDoRun(self):
        servicemanager.LogMsg(servicemanager.EVENTLOG_INFORMATION_TYPE,
                              servicemanager.PYS_SERVICE_STARTED,
                              (self._svc_name_, ''))
        self.logger.info('Npm Service started')

        while self.is_running:
            try:
                self.main()
            except Exception as e:
                self.logger.error(f'Error: {str(e)}')

        self.logger.info('Npm Service stopped')

    def main(self):
        project_path = r'C:\Users\DESA03\Desktop\API-node-JM-master'  # Ruta del proyecto
        os.chdir(project_path)  # Cambia al directorio del proyecto

        command = 'npm run dev'
        process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)

        # Lee y registra la salida estándar del proceso
        for line in iter(process.stdout.readline, b''):
            line = line.decode('utf-8').strip()
            self.logger.info(f'npm run dev output: {line}')

        # Lee y registra la salida de error del proceso
        for line in iter(process.stderr.readline, b''):
            line = line.decode('utf-8').strip()
            self.logger.error(f'npm run dev error: {line}')

        process.stdout.close()
        process.stderr.close()
        process.wait()


if __name__ == '__main__':
    if len(sys.argv) == 1:
        servicemanager.Initialize()
        servicemanager.PrepareToHostSingle(NpmService)
        servicemanager.StartServiceCtrlDispatcher()
    else:
        win32serviceutil.HandleCommandLine(NpmService)
