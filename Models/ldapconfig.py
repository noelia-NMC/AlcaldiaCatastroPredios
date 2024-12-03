from pydantic import BaseModel, Field

class LdapConfig(BaseModel):
    ldap_host: str = Field(..., alias="LdapHost")
    domain_name: str = Field(..., alias="DomainName")
    user: str = Field(..., alias="User")
    password: str = Field(..., alias="Password")
    ldap_port: int = Field(..., alias="LdapPort")


    class Config:
        orm_mode = True
