@ECHO OFF
CD ..
SET /p="检查Gulp运行时..."<nul
FOR /F "delims=" %%I IN ("gulp") DO (
    IF EXIST %%~$PATH:I (
        ECHO Yes
    ) ELSE (
        ECHO No
        GOTO :INSTALL_GULP_CLI
    )
)

SET /p="检查node_modules..."<nul
IF EXIST node_modules (
    ECHO Yes
) ELSE (
    ECHO No
    GOTO :INSTALL_NODE_MODULES
)

GOTO :END

:INSTALL_GULP_CLI
SET /p="正在安装Gulp运行时..."<nul
CMD /C npm install -g gulp
GOTO :END

:INSTALL_NODE_MODULES
SET /p="正在安装node_modules..."<nul
CMD /C npm install
GOTO :END

:END
ECHO.
SET /p="开发环境已经配置完成，"<nul
PAUSE
