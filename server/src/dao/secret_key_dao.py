from ... import engine, app


class SecretKeyDao:
    @staticmethod
    def get_jwt_key():
        conn = engine.raw_connection()
        try:
            cursor = conn.cursor()
            cursor.callproc('SecretKey_GetJwt')
            row = next(cursor.stored_results()).fetchone()
            cursor.close()
            if row:
                return row[0]
        except Exception as e:
            app.logger.exception(e)
            return None
        finally:
            conn.close()