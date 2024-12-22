export const createRoleIfNotExistsQuery = `
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'default_role') THEN
    CREATE ROLE default_role WITH LOGIN SUPERUSER;
  END IF;
END
$$;
`;
