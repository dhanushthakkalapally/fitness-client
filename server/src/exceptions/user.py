class InvalidCredentials(Exception):
    def __init__(self, message, error_code=400):
        self.message = message
        self.error_code = error_code
